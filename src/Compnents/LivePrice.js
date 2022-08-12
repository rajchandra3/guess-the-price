import React, { useEffect, useState } from "react";
import { getFormattedAmount } from "Shared/Utils";
import { getCoinInfo } from "Shared/CoinGecko";
import Typography from "antd/lib/typography";
import { Col, Row } from "antd";

const { Text, Title } = Typography;

const LivePrice = () => {
    const PRICE_REFRESH_TIME = 60;
    const [coinInfo, setCoinInfo] = useState({});
    const [priceUpdateTimer, setPriceUpdateTimer] = useState(
        PRICE_REFRESH_TIME
    );

    const updateCoinInfo = async () => {
        const coin = await getCoinInfo("bitcoin");
        setCoinInfo(coin);
    };

    useEffect(() => {
        updateCoinInfo();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPriceUpdateTimer(priceUpdateTimer - 1);
        }, 1000);

        if (priceUpdateTimer === 0) {
            setPriceUpdateTimer(PRICE_REFRESH_TIME);
            updateCoinInfo();
        }

        return () => clearInterval(interval);
    }, [priceUpdateTimer]);

    return (
        <div>
            {coinInfo && (
                <Row
                    style={{
                        margin: "32px",
                        padding: "20px",
                        boxShadow:
                            "rgba(0, 0, 0, 0.12) 0px 1px 8px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "start",
                        }}
                    >
                        <Title
                            level={4}
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                            }}
                        >
                            <img
                                src={coinInfo?.image?.large}
                                alt="coin icon"
                                width="16px"
                            />
                            &nbsp;{coinInfo?.name}
                        </Title>
                        &nbsp;
                        <Text type="secondary">is trading at </Text>
                    </Col>
                    <Col>
                        <Title level={3}>
                            &#8377;
                            {coinInfo.market_data
                                ? getFormattedAmount(
                                      coinInfo.market_data.current_price.inr
                                  )
                                : "..."}
                        </Title>
                    </Col>
                    <Col>
                        <Text type="secondary">
                            Price will update in {priceUpdateTimer} sec
                        </Text>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default LivePrice;
