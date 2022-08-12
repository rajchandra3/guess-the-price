import React from "react";

import { Typography } from "antd";
const { Title } = Typography;

const Scorecard = (props) => {
    const { score = 0 } = props;
    return (
        <div>
            <div
                style={{
                    textAlign: "center",
                    margin: "32px",
                    padding: "20px",
                    boxShadow:
                        "rgba(0, 0, 0, 0.12) 0px 1px 8px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
            >
                <Title level={5}>Your Score</Title>
                <br />
                <Title level={1}>{score}</Title>
            </div>
        </div>
    );
};

export default Scorecard;
