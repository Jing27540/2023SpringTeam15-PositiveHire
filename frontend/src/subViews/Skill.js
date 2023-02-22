import React from "react";
import styled from "styled-components";
/**
 * Skill component to show Employee skill information.
 * @author Jing Huang
 */

const Box = styled.div`
    display: flex;
`;
const SideBox = styled.div`
    width: ${({ width = '50%' }) => width};
    justify-content: center;
`;

function Skill() {

    return (
        <Box>
            <SideBox>hello</SideBox>
            <SideBox>hello</SideBox>
        </Box>
    );
}

export default Skill;