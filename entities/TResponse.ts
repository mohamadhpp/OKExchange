interface TResponse<T>
{
    status: boolean | false,
    message: string,
    data: T | null
}

export default TResponse;