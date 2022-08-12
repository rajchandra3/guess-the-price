import React, { useEffect, useState } from "react";

import { Button, Row, Space, Typography } from "antd";
import { getCurrentPrice } from "Shared/CoinGecko";
const { Title, Text } = Typography;

const Question = (props) => {
    const { updateScore = () => {} } = props;
    const RESULT_DELAY_TIME = 60;
    const [response, setResponse] = useState(null);
    const [priceOnUserPrediction, setPriceOnUserPrediction] = useState(null);
    const [userResponseResult, setUserResponseResult] = useState(null);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const [resultTimer, setResultTimer] = useState(RESULT_DELAY_TIME);

    const saveResponse = async (userInput) => {
        setResponse(userInput);

        //get price on user input
        setPriceOnUserPrediction(await getCurrentPrice("bitcoin"));

        //start timer
        setIsTimerActive(true);
    };

    const getResult = async () => {
        //get current price
        const currentPrice = getCurrentPrice("bitcoin");

        const result =
            response ===
            (priceOnUserPrediction - currentPrice > 0 ? "DOWN" : "UP");
        setUserResponseResult(result ? "Correct" : "Wrong");

        //update score
        updateScore(result ? 1 : -1);
    };

    useEffect(() => {
        if (isTimerActive) {
            const interval = setInterval(() => {
                setResultTimer(resultTimer - 1);
            }, 1000);

            if (resultTimer === 0) {
                setResultTimer(RESULT_DELAY_TIME);
                setIsTimerActive(false);
                getResult();
            }
            return () => clearInterval(interval);
        }
    }, [resultTimer, isTimerActive]);

    return (
        <div
            style={{
                margin: "32px",
                padding: "20px",
                boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 8px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
        >
            <Text type="secondary">In the next 60 seconds</Text>
            <Title style={{ marginTop: "0" }}>
                Will the price of $BTC go up or down?
            </Title>
            <br />
            <Row justify="center">
                <Space size={3}>
                    <Button
                        shape="round"
                        size="large"
                        style={{
                            width: "100px",
                        }}
                        type="primary"
                        onClick={() => saveResponse("UP")}
                        disabled={isTimerActive}
                    >
                        UP
                    </Button>
                    <Button
                        shape="round"
                        size="large"
                        style={{ width: "100px" }}
                        type="danger"
                        onClick={() => saveResponse("DOWN")}
                        disabled={isTimerActive}
                    >
                        DOWN
                    </Button>
                </Space>
            </Row>
            {response && (
                <Row justify="center" style={{ padding: "16px" }}>
                    {isTimerActive ? (
                        <Text>Loading your result in {resultTimer} sec</Text>
                    ) : (
                        <div>
                            <Text>
                                Your response was {response} and your response
                                is
                            </Text>
                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bolder",
                                    textAlign: "center",
                                }}
                            >
                                {userResponseResult}
                            </div>
                        </div>
                    )}
                </Row>
            )}
        </div>
    );
};

export default Question;
