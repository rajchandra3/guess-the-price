import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";

import Scorecard from "Compnents/Scorecard";
import Question from "Compnents/Question";
import LivePrice from "Compnents/LivePrice";

const Homepage = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const prevScore = Number(localStorage.getItem("score"));
        setScore(prevScore);
    }, []);

    const updateScore = (value) => {
        setScore(score + value);
        localStorage.setItem("score", score + value);
    };
    return (
        <div>
            <Row>
                <Col xs={24} md={6}>
                    <LivePrice />
                </Col>
                <Col xs={24} md={12}>
                    <Question updateScore={updateScore} />
                </Col>
                <Col xs={24} md={6}>
                    <Scorecard score={score} />
                </Col>
            </Row>
        </div>
    );
};

export default Homepage;
