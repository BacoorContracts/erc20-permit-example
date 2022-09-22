import { Component } from "react"
import { Button, Divider, Form, Grid, Input, Label, LabelDetail, Segment, Select } from "semantic-ui-react"
import Governance from "../consts/contracts/Governance"
import { BigNumber, ethers } from "ethers"
import ProviderFactory from "../services/meta-wallet/ProviderFactory"
import { EIP712_PERMIT } from "../consts/erc-permit"
import Marketplace from "../consts/contracts/Marketplace"
import PaymentToken from "../consts/contracts/PaymentToken"
import getTokenId from "../utils/getTokenId"
import Collectible721 from "../consts/contracts/Collectible721"
import Collectible1155 from "../consts/contracts/Collectible1155"
import { TypedStruct } from "../types/eip712-typed-struct"
import UserWallet from "../services/meta-wallet/UserWallet"
import { RECEIPT_STRUCT } from "../consts/receipt"
import { MessageTypes, signTypedData, SignTypedDataVersion, TypedMessage } from "@metamask/eth-sig-util"
import { TypedDataUtils } from "ethers-eip712"

export default class Home extends Component<Record<string, any>, Record<any, string | Record<string, string> | UserWallet | null>> {
    state = {
        tokenId: "",
        amount: "10",
        tokenURI: "ipfs",
        unitPrice: "2",
        creatorFee: "250",
        maxSupply: "10000",
        type: "1155",
        paymentToken: "",
        connectedAddress: "",
        buyerDeadline: "",
        sellerDeadline: "",
        buyerAddr: "",
        sellerAddr: "",
        sellerSignature: "",
        buyerSignature: "",
        nftContract: "",
        signatures: {} as Record<string, string>,
        wallet: null,
        total: "",
    }
    static async getInitialProps(_props: any): Promise<{ [key: string]: any }> {
        const governance = Governance()

        return {
            governance: governance,
        }
    }

    sellerSign = async () => {
        // const wallet: UserWallet = await ProviderFactory.createWalletFrom("ethereum")
        // wallet.connect()
        const wallet = this.state.wallet || (await ProviderFactory.createWalletFrom("ethereum"))
        wallet.connect()
        this.setState({ wallet: wallet })
        const type = BigNumber.from(this.state.type)
        const currentAddress = await wallet.signer.getAddress()
        const tokenId = await getTokenId(
            BigNumber.from(this.state.creatorFee),
            type,
            BigNumber.from(this.state.maxSupply),
            BigNumber.from(0),
            currentAddress
        )
        const signer = await wallet.signer
        console.log(signer)
        const provider = await wallet.provider

        const nft = type.toNumber() == 721 ? Collectible721() : Collectible1155()

        const domain = {
            name: `Collectible${type}`,
            version: "v1",
            chainId: (await provider.getNetwork()).chainId,
            verifyingContract: nft.address,
        }

        const now = (await provider.getBlock("latest")).timestamp
        const deadline = (now + 2880 * 60 * 1000).toString()

        const marketplaceAddr = Marketplace().address
        const message =
            type.toNumber() == 721
                ? ({
                      spender: marketplaceAddr,
                      tokenId: tokenId.toString(),
                      nonce: (await nft.nonces(tokenId)).toString(),
                      deadline: deadline,
                  } as TypedStruct.PermitStruct721)
                : ({
                      owner: currentAddress,
                      spender: marketplaceAddr,
                      nonce: (await nft.nonces(currentAddress)).toString(),
                      deadline: deadline,
                  } as TypedStruct.PermitStruct1155)

        const typedData = EIP712_PERMIT(type.toNumber(), domain, message)
        const signature = await signer._signTypedData(domain, { Permit: typedData.types.Permit }, message)
        this.state.signatures[currentAddress] = signature
        this.setState({ sellerSignature: signature })
        this.setState({ tokenId: tokenId.toString() })
        this.setState({ nftContract: nft.address })
        this.setState({ sellerDeadline: deadline })
        this.setState({ sellerAddr: currentAddress })
    }

    buyerSign = async (event: any) => {
        event.preventDefault()
        //const wallet: UserWallet = await ProviderFactory.createWalletFrom("ethereum")
        //wallet.connect()
        // const wallet = this.state.wallet || (await ProviderFactory.createWalletFrom("ethereum"))
        const wallet = await ProviderFactory.createWalletFrom("ethereum")
        wallet.connect()
        const signer = await wallet.signer
        const provider = await wallet.provider
        const currentAddress = await signer.getAddress()
        const paymentToken = PaymentToken()
        const marketplaceAddr = Marketplace().address
        const domain = {
            name: `PaymentToken`,
            version: "1",
            chainId: (await provider.getNetwork()).chainId,
            verifyingContract: paymentToken.address,
        }

        const now = (await provider.getBlock("latest")).timestamp
        const deadline = (now + 2880 * 60 * 1000).toString()

        const total = parseInt(this.state.amount) * parseInt(this.state.unitPrice)
        this.setState({ total: total.toString() })
        const message = {
            owner: currentAddress,
            spender: marketplaceAddr,
            value: ethers.utils.parseEther(total.toString()).toString(),
            nonce: (await paymentToken.nonces(currentAddress)).toString(),
            deadline: deadline,
        } as TypedStruct.PermitStruct20

        const typedData = EIP712_PERMIT(20, domain, message)
        const signature = await signer._signTypedData(domain, { Permit: typedData.types.Permit }, message)
        this.setState({ buyerSignature: signature })
        this.setState({ paymentToken: paymentToken.address })
        this.setState({ buyerDeadline: deadline })
        this.setState({ buyerAddr: currentAddress })
    }

    adminSign = async () => {
        const wallet = await ProviderFactory.createWalletFrom("ethereum")
        wallet.connect()
        const currentAddress = await wallet.signer.getAddress()
        console.log(currentAddress)
        const _provider = await wallet.provider
        const signer = _provider.getSigner(currentAddress)

        let buyerSig: { v: any; r: any; s: any }

        {
            const { v, r, s } = ethers.utils.splitSignature(this.state.buyerSignature)
            buyerSig = { v, r, s }
        }

        let sellerSig: { v: any; r: any; s: any }
        {
            const { v, r, s } = ethers.utils.splitSignature(this.state.sellerSignature)
            sellerSig = { v, r, s }
        }

        const now = (await _provider.getBlock("latest")).timestamp
        const deadline = (now + 2880 * 60 * 1000).toString()

        const marketplace = Marketplace()
        const domain = {
            name: `Marketplace`,
            version: "v1",
            chainId: (await _provider.getNetwork()).chainId,
            verifyingContract: marketplace.address,
        }
        const message = {
            header: {
                buyer: {
                    addr: this.state.buyerAddr,
                    v: buyerSig.v,
                    deadline: this.state.buyerDeadline,
                    r: buyerSig.r,
                    s: buyerSig.s,
                } as TypedStruct.User,
                seller: {
                    addr: this.state.sellerAddr,
                    v: sellerSig.v,
                    deadline: this.state.sellerDeadline,
                    r: sellerSig.r,
                    s: sellerSig.s,
                } as TypedStruct.User,
                nftContract: this.state.nftContract,
                paymentToken: this.state.paymentToken,
            } as TypedStruct.Header,

            item: {
                amount: this.state.amount,
                tokenId: this.state.tokenId,
                unitPrice: ethers.utils.parseEther(this.state.unitPrice).toString(),
                tokenURI: this.state.tokenURI,
            } as TypedStruct.Item,

            nonce: (await marketplace.nonces(this.state.sellerAddr)).toString(),
            deadline: deadline,
        } as TypedStruct.Receipt
        const typedData = RECEIPT_STRUCT(domain, "Receipt", message)
        console.log(message)
        const privateKey = Buffer.from("871595f05091ac05c6e0c8d39d1240926491382af63ccecb6779aef473a2c500", "hex")
        const signature = signTypedData({
            privateKey,
            data: typedData as TypedMessage<MessageTypes>,
            version: SignTypedDataVersion.V4,
        })

        console.log("Eth sig", signature)

        const admin = new ethers.Wallet("871595f05091ac05c6e0c8d39d1240926491382af63ccecb6779aef473a2c500", _provider)
        const sig1 = await admin._signTypedData(
            domain,
            { Header: typedData.types.Header, User: typedData.types.User, Item: typedData.types.Item, Receipt: typedData.types.Receipt },
            message
        )
        console.log("Ethers sig", sig1)

        const digest = TypedDataUtils.encodeDigest(typedData)
        const sig2 = await admin.signMessage(digest)

        console.log("Ethers EIP721", sig2)

        console.log(sig1 === signature)
        console.log(sig2 !== signature)

        // const signature = signTypedData({
        //     privateKey,
        //     data: {
        //       types,
        //       primaryType: "Test",
        //       domain,
        //       message: {
        //         Request: "This is a request"
        //       },
        //     },
        //     version: SignTypedDataVersion.V4,
        //   });
        // marketplace
        //     .connect(signer)
        //     .redeem(message, signature, { gasLimit: 400000 })
        //     .then(
        //         async (result) => {
        //             await result.wait()
        //             console.log(result)
        //         },
        //         (error) => {
        //             console.log(error)
        //             // error.reason - The Revert reason; this is what you probably care about. :)
        //             // Additionally:
        //             // - error.address - the contract address
        //             // - error.args - [ BigNumber(1), BigNumber(2), BigNumber(3) ] in this case
        //             // - error.method - "someMethod()" in this case
        //             // - error.errorSignature - "Error(string)" (the EIP 838 sighash; supports future custom errors)
        //             // - error.errorArgs - The arguments passed into the error (more relevant post EIP 838 custom errors)
        //             // - error.transaction - The call transaction used
        //         }
        //     )
        try {
            const res = await marketplace.connect(signer).redeem(message, signature, { gasLimit: 400000 })
            //console.log(receipt)
            const receipt = await res.wait()
            // console.log(receipt)
        } catch (error: any) {
            const _interface = marketplace.interface
            console.log(error)
            console.log(error.codeName)
            console.log(error.receipt)
            // //console.log(error.reason)
            // console.log(error.errorSignature)
            // //console.log(error.transactionHash)
            // //const hash = error.transactionHash
            const tx = error.transaction
            if (!tx) {
                console.log("tx not found")
            } else {
                let code = await _provider.call(tx, tx.blockNumber)
                let reason = this.hex_to_ascii(code.substr(138))
                console.log("revert reason:", reason)
            }
        }
    }

    hex_to_ascii(str1: any) {
        var hex = str1.toString()
        var str = ""
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
        }
        return str
    }

    render() {
        return (
            <Segment basic textAlign="center">
                <Grid columns={3} relaxed="very">
                    <Grid.Column>
                        <Divider horizontal>Seller</Divider>
                        <Form onSubmit={this.sellerSign}>
                            <Form.Field
                                control={Select}
                                fluid
                                label="ERC"
                                options={[
                                    { key: "n", text: "Non Fungible", value: "721" },
                                    { key: "s", text: "Semi Fungible", value: "1155" },
                                ]}
                                placeholder="Standard"
                                onChange={(e: any, { value }: any) => this.setState({ type: value })}
                            ></Form.Field>
                            {/* <Form.Field>
                                <Label>Amount</Label>
                                <Input
                                    value={this.state.amount}
                                    placeholder="Amount"
                                    onChange={(e) => this.setState({ amount: e.target.value })}
                                />
                            </Form.Field> */}
                            <Form.Field>
                                <Label>Max Supply </Label>
                                <Input
                                    value={this.state.maxSupply}
                                    placeholder="Max Supply"
                                    onChange={(e) => this.setState({ maxSupply: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Label>Creator Fee</Label>
                                <Input
                                    value={this.state.creatorFee}
                                    placeholder="Max Supply"
                                    onChange={(e) => this.setState({ creatorFee: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Label>TokenURI</Label>
                                <Input
                                    value={this.state.tokenURI}
                                    placeholder="Token URI"
                                    onChange={(e) => this.setState({ tokenURI: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Label>Unit Price</Label>
                                <Input
                                    value={this.state.unitPrice}
                                    placeholder="Unit Price"
                                    onChange={(e) => this.setState({ unitPrice: e.target.value })}
                                />
                            </Form.Field>
                            <Button type="submit">List</Button>
                        </Form>
                    </Grid.Column>

                    <Grid.Column>
                        <Divider horizontal>Buyer</Divider>
                        <Form onSubmit={this.buyerSign}>
                            <Form.Field>
                                <Label>
                                    Token Id
                                    <LabelDetail>{this.state.tokenId}</LabelDetail>
                                </Label>
                            </Form.Field>
                            <Form.Field>
                                <Label>
                                    Unit Price
                                    <LabelDetail>{this.state.unitPrice}</LabelDetail>
                                </Label>
                            </Form.Field>
                            <Form.Field>
                                <Label pointing>Amount</Label>
                                <Input
                                    placeholder="Amount"
                                    value={this.state.amount}
                                    onChange={(e) =>
                                        this.setState({ amount: parseInt(e.target.value).toString() })
                                    }
                                ></Input>
                            </Form.Field>
                            <Form.Field>
                                <Label>
                                    Total
                                    <LabelDetail>{parseInt(this.state.amount) * parseInt(this.state.unitPrice)}</LabelDetail>
                                </Label>
                            </Form.Field>
                            <Button type="submit">Buy</Button>
                        </Form>
                    </Grid.Column>
                    {/* <Divider horizontal>Seller</Divider> */}
                    <Grid.Column>
                        <Divider horizontal>Admin</Divider>
                        <Button onClick={this.adminSign}>Admin Process</Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

// const Home: NextPage = () => {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.tsx</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }

// export default Home
