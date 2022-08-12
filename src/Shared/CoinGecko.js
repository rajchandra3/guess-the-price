import CoinGecko from "coingecko-api";

const CoinGeckoClient = new CoinGecko();

export const getCoinInfo = async (assetId) => {
    const response = await CoinGeckoClient.coins.fetch(assetId, {
        market_data: true,
        tickers: false,
        community_data: false,
        developer_data: false,
        localization: false,
        sparkline: false,
    });
    return response.data;
};

export const getCurrentPrice = async (assetId) => {
    const coin = await getCoinInfo(assetId);
    return coin.market_data.current_price.inr;
};
