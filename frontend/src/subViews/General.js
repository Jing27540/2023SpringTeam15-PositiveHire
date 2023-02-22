import React from "react";
import styled from "styled-components";
/**
 * General component to hold General Profile information
 * @author Jing Huang
 */

const Box = styled.div`
    display: flex-block;
    margin: 2%;
    width: 95%;
    align-items:left;
    overflow: auto;
`

const Title = styled.label`
    float: left;
    margin-bottom: 15px;
    margin-left: 10px;
`;

const Children = styled.div`
    display: flex;
    margin-bottom: 35px;
    gap: 300px;
    align-items:left;
    justify-content: flex-start;
`

const Block = styled.div`
    float: left;
    width: ${({ width = '100px' }) => width};
`;

const TITLES = ['First Name', 'Last Name', 'Employee #',
    'Access Role', 'User Status', 'Employee Type',
    'Job Tier', 'Job Title', 'Job History',
    'Company Start Date', 'Departments'];

const DummyData = ['Sharon', 'Owens', '90782846',
    'Administrator', 'Active Employee', 'Full Time',
    'Engineering Department', 'Java Software Engineer, Engineering Department, 02/01/2022 - Present', 'Software Engineer, Engineering Department, 01/10//2021 - 02/01/2022',
    '09/16/2019', 'Engineering'];

function General() {

    return (
        <div>
            <Title><h5>General Employee Information</h5></Title>
            <Box>
                <Block width={'35%'}>
                    {
                        TITLES.map((item) => {
                            return (
                                <Children>
                                    <h7>{item}</h7>
                                </Children>
                            );
                        })
                    }
                </Block>
                <Block width={'65%'}>
                    {
                        DummyData.map((item) => {
                            return (
                                <Children>
                                    <h7>{item}</h7>
                                </Children>
                            );
                        })
                    }
                </Block>
            </Box>
        </div>
    );

}

export default General;