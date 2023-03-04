import React from "react";
import styled from "styled-components";
import VerticalBar from "../components/VerticalBar";
import CreateJobPosting from "../subViews/CreateJobPosting";
/**
 * 
 * @author Jing Huang
 */

const Box = styled.div`
    display: flex;
    margin: 10px;
    height: ${({ height = '50%' }) => height};
    width: 100%;
    justify-content: center;
    overflow: auto;
`
const LeftBox = styled.div`
    width: 10%;
    float: left;
    margin-top: 10%;
`;

const RightBox = styled.div`
    width: 90%;
    float: left;
`;

function JobPosting() {

    const [mode, setMode] = React.useState();

    console.log(mode);

    return (

        <Box>
            <LeftBox><VerticalBar setMode={setMode} /></LeftBox>
            <RightBox>
                {mode === 'Create' ?
                    <CreateJobPosting />
                    :
                    undefined
                }
            </RightBox>
        </Box>
    );

}

export default JobPosting;