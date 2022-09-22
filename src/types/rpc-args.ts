export namespace RPCArguments {
    export interface ConnectInfo {
        chainId: string
    }

    export interface ProviderMessage {
        type: string
        data: unknown
    }

    export interface RequestArguments {
        method: string
        params?: unknown[] | object
    }
}