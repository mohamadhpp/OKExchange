export function Last24HourChangePercentage(last_price: number, open_24h_price: number): number
{
    return Number((((last_price - open_24h_price) / open_24h_price) * 100).toFixed(2));
}

export function TomanPrice(coin_price: number, usdt_price: number): string
{
    return Number((usdt_price * coin_price).toFixed(3)).toLocaleString().toString();
}