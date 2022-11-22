import { Component } from "react"
import { Button, Divider, Form, Grid, Input, Label, Segment, Select } from "semantic-ui-react"
import { ethers } from "ethers"
import ProviderFactory from "../services/meta-wallet/ProviderFactory"
import { EIP712_PERMIT } from "../consts/erc-permit"
import PaymentToken from "../consts/contracts/PaymentToken"
import { TypedStruct } from "../types/eip712-typed-struct"
import UserWallet from "../services/meta-wallet/UserWallet"
import { MessageTypes, TypedDataUtils, signTypedData, SignTypedDataVersion, TypedMessage } from "@metamask/eth-sig-util"

export default class Home extends Component<Record<string, any>, Record<any, string | Record<string, string> | UserWallet | null>> {
    state = {
        digest: "",
        timestamp: "",
        amount: "10",
        spender: "0xf0333664C989E0E7b26fe84f0796c2f4064Be309",
        paymentToken: "0xDc9ec7717E7e6F13fcf02cE1b40b7AFf5fb8Eb1d",
        buyerDeadline: "",
        buyerAddr: "",
        buyerSignature: "",
        v: "",
        r: "",
        s: "",
        wallet: null,
    }

    buyerSign = async (event: any) => {
        const wallet = this.state.wallet || (await ProviderFactory.createWalletFrom("ethereum"))
        wallet.connect()
        this.setState({ wallet: wallet })

        const signer = await wallet.signer
        const provider = await wallet.provider
        const currentAddress = await signer.getAddress()
        const paymentToken = PaymentToken(this.state.paymentToken)
        const domain = {
            name: await paymentToken.name(),
            version: "1",
            chainId: 56,
            verifyingContract: paymentToken.address,
        }

        const now = (await provider.getBlock("latest")).timestamp
        const deadline = (now + parseInt(this.state.buyerDeadline) * 60).toString()
        this.setState({ timestamp: deadline })
        const message = {
            owner: currentAddress,
            spender: this.state.spender,
            value: ethers.utils.parseEther(this.state.amount.toString()).toString(),
            nonce: (await paymentToken.nonces(currentAddress)).toString(),
            deadline: deadline,
        } as TypedStruct.PermitStruct20

        const typedData = EIP712_PERMIT(20, domain, message)
        //const digest = TypedDataUtils.hashType()
        const digest = TypedDataUtils.eip712Hash(typedData as TypedMessage<MessageTypes>, SignTypedDataVersion.V4)
        this.setState({ digest: ethers.utils.hexlify(digest) })
        const signature = await signer._signTypedData(domain, { Permit: typedData.types.Permit }, message)
        this.setState({ buyerSignature: signature })
        const { v, r, s } = ethers.utils.splitSignature(signature)
        this.setState({ v: v.toString() })
        this.setState({ r: r.toString() })
        this.setState({ s: s.toString() })
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
                        <Divider horizontal>Buyer</Divider>
                        <Form onSubmit={this.buyerSign}>
                            <Form.Field required={true}>
                                <Label>ERC20 Address</Label>
                                <Input value={this.state.paymentToken} onChange={(e) => this.setState({ paymentToken: e.target.value })} />
                            </Form.Field>
                            <Form.Field required={true}>
                                <Label>Spender Address</Label>
                                <Input value={this.state.spender} onChange={(e) => this.setState({ spender: e.target.value })} />
                            </Form.Field>
                            <Form.Field required={true}>
                                <Label pointing>Amount</Label>
                                <Input
                                    placeholder="Amount"
                                    value={this.state.amount}
                                    onChange={(e) => this.setState({ amount: parseInt(e.target.value).toString() })}
                                ></Input>
                            </Form.Field>
                            <Form.Field required={true}>
                                <Label pointing>Deadline (min)</Label>
                                <Input
                                    placeholder="Deadline"
                                    value={this.state.buyerDeadline}
                                    onChange={(e) => this.setState({ buyerDeadline: parseInt(e.target.value).toString() })}
                                ></Input>
                            </Form.Field>
                            <Form.Field required={true}>
                                <Label pointing>Timestamp</Label>
                                <Input placeholder="Timestamp" value={this.state.timestamp}></Input>
                            </Form.Field>
                            <Form.Field>
                                <Label>Digest</Label>
                                <Input value={this.state.digest} />
                            </Form.Field>
                            <Form.Field>
                                <Label>Signature</Label>
                                <Input value={this.state.buyerSignature} />
                            </Form.Field>
                            <Form.Field>
                                <Label>v</Label>
                                <Input value={this.state.v} />
                            </Form.Field>
                            <Form.Field>
                                <Label>r</Label>
                                <Input value={this.state.r} />
                            </Form.Field>
                            <Form.Field>
                                <Label>s</Label>
                                <Input value={this.state.s} />
                            </Form.Field>
                            <Button type="submit">Permit</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}
