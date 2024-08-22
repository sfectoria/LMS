import React, { useEffect, useMemo, useState } from 'react'
import Stack from '@mui/material/Stack';
import {Box, Avatar, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessions, deletesession, editsession } from "../../store/sessions";
 
    function AllSessions() {
        const sessions = useSelector((state) => state.sessionsSlice.sessions.items);
        const [modalShow, setModalShow] = useState(false);
        const [deletedId, setDeletedId] = useState("");
        const navigate = useNavigate();
      const dispatch = useDispatch();
      useEffect
        (() => {
          dispatch(fetchSessions());
        }, [dispatch]);

        const columns = useMemo(()=>[
            {field: 'imageURL', headerName:'image', width:50, renderCell : (params)=> <Avatar src={params.row.imageURL}/>, sortable : false, filterable : false,},
            {field: 'title', headerName:'title', width:200},
           {field: 'duration', headerName:'duration', width:150}  ,
          { field: 'program', headerName: 'program', width: 200, valueGetter: (params) => params ?.row.title},
        
          
            {field: '', headerName:'Action', width:250,  sortable: false,
              disableClickEventBubbling: true,
            

            renderCell: (params) => {
                return (
                  <Stack direction="row" spacing={2}>
                    <Button
                      size="small"
                      onClick={() =>
                        navigate(`/sessions/update/${params.row.id}`)
                      }
                      variant="outlined"
                      color="secondary"
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => navigate(`/sessions/${params.row.id}`)}
                      variant="outlined"
                    >
                      See more
                    </Button>

                    <Button
                      size="small"
                      onClick={() => {
                        setModalShow(true);
                        setDeletedId(params.row.id)
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Stack>
                );
            },},
            
          ],[] )
 
        return (
          <div>
            <div className="d-flex justify-content-between">
              <h3
                className="p-5"
                style={{
                  fontFamily: "Segoe UI",
                  color: "#11354D",
                  textDecoration: "underline",
                }}
              >
                Welcome to sessions page
              </h3>

              <div className=" p-5">
                <button
                  className="btn"
                  style={{ backgroundColor: "#ffc107" }}
                  onClick={() => navigate("/sessions/add")}
                >
                  + Add new session
                </button>
              </div>
            </div>

            <Box
              sx={{
                height: "100%",
                width: "100%",
              }}
            >
              <DataGrid
                columns={columns}
                rows={sessions}
                style={{
                  display: "flex",
                  justifyContent: "center",

                  width: "100%",
                }}
              />
            </Box>

            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Delete session
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this session ?</p>
              </Modal.Body>
              <div className="d-flex justify-content-center gap-2 py-3">
                <Button onClick={() => setModalShow(false)}>Cancle</Button>

                <Button
                  className="btn btn-danger"
                  onClick={() => {
                   dispatch(
                          editsession({
                            id: deletedId,
                            body: { archived: true },
                          })
                        ).then((res) => {
                          dispatch(fetchSessions());
                        })
                    setModalShow(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Modal>
          </div>
        );
    

}
export default AllSessions