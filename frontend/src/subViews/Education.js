





return (
    <Container>
        <Col sm={8}>
            <Container style={{ marginTop: '2%', justifyContent: "space-between" }}>
                <Row style={{ textAlign: 'left' }}>
                    {/* <Col style={{ fontSize: '15px', float: 'left' }}>Updated: Dec 30, 2022</Col> */}
                    <Col>
                        <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", float: 'left', width: '100px' }} onClick={() => { handleShow(); setMode(true) }}>
                            Add
                        </Button>
                    </Col>
                    <Col>
                        <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", float: 'right', width: '100px' }} onClick={() => { handleShow(); setMode(false) }}>
                            Edit
                        </Button>
                    </Col>
                </Row>
                <Row style={{ textAlign: 'left', margin: '2%', backgroundColor: "#0F123F", color: "white", height: "50px", borderRadius: 10, fontWeight: 'bold', alignItems: 'center' }}>
                    <Col>Skills</Col>
                    <Col>Level</Col>
                    <Col>Score</Col>
                </Row>
                <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>Technique Skills</Row>
                <HorizontalLine></HorizontalLine>
                {employee.technicalSkills.map((item, index) => {
                    return (
                        <Row key={index} style={{ textAlign: 'left', margin: '2%' }}>
                            <Col>{item.name}</Col>
                            <Col>{item.level}</Col>
                            <Col>{item.score}</Col>
                        </Row>
                    );
                })}
                <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>People Skills</Row>
                <HorizontalLine></HorizontalLine>
                {employee.peopleSkills.map((item, index) => {
                    return (
                        <Row key={index} style={{ textAlign: 'left', margin: '2%' }}>
                            <Col>{item.name}</Col>
                            <Col>{item.level}</Col>
                            <Col>{item.score}</Col>
                        </Row>
                    );
                })}
                <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>Work Ethics</Row>
                <HorizontalLine></HorizontalLine>
                {employee.workEthic.map((item, index) => {
                    return (
                        <Row key={index} style={{ textAlign: 'left', margin: '2%' }}>
                            <Col>{item.name}</Col>
                            <Col>{item.level}</Col>
                            <Col>{item.score}</Col>
                        </Row>
                    );
                })}
            </Container>
        </Col>
        <Col>
            <VerticleLine></VerticleLine>
        </Col>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Skill & Certification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <EditForm addMode={mode} employee={props.employee} mode={true} /> */}
                <Form.Select aria-label="Default select example" id="type" onChange={e => setType(e.target.value)} style={{ margin: '2%', width: '95%' }}>
                    <option>Skill Type</option>
                    <option value="technicalSkills">TechnicalSkills</option>
                    <option value="peopleSkills">PeopleSkills</option>
                    <option value="workEthic">WorkEthic</option>
                </Form.Select>
                {(mode) ?
                    <FloatingLabel label="Name" id="sname" onChange={e => setSName(e.target.value)} style={{ margin: '2%' }} />
                    :
                    <Form.Select aria-label="Default select example" id="sname" onChange={e => { setSName(e.target.value); }} style={{ margin: '2%', width: '95%' }}>
                        <option>Skill Name</option>
                        {
                            options ?
                                options.map((item, index) => {
                                    return (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    );
                                })
                                :
                                undefined
                        }
                    </Form.Select>
                }
                <FloatingLabel label="Level" id="level" onChange={e => setLevel(e.target.value)} style={{ margin: '2%' }} />
                <FloatingLabel label="Score" id="score" onChange={e => setScore(e.target.value)} style={{ margin: '2%' }} />
                <div style={{ justifyContent: 'left', alignItems: 'left', fontSize: '15px', margin: "10px", color: 'red' }}>{message}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={() => { saveSkill({ type: type, name: sname, level: level, score: score }); clear(); }}>
                    Save
                </Button>
                {
                    !mode ?
                        <Button variant="secondary" onClick={() => { deleteSkill(type, sname); clear(); }} >
                            Remove
                        </Button>
                        :
                        undefined
                }
            </Modal.Footer>
        </Modal>
    </Container>
);