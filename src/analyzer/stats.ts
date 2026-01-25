

export const computeStats = (results: { isClient: boolean }[]) => {

    const total = results.length
    const client = results.filter(r => r.isClient).length
    const server = total - client

    const ratioServer = total === 0 ? 0 : Math.round((server / total) * 100)
    const ratioClient = total === 0 ? 0 : 100 - ratioServer

    return {
        total,
        client,
        server,
        ratioServer,
        ratioClient
    }
}
