import React from "react";
import { Navigate } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { Container, Card, Typography, CardContent, Link, Box, Divider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Auth from "../utils/auth.js";

import { GET_ME } from "../utils/queries"

import SnippetForm from "../components/SnippetForm"

const Dashboard = () => {
  //add in me query here
  const { loading, data } = useQuery(GET_ME)

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '5px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (!Auth.loggedIn()) ? 
    (
      <Navigate to="/login" />
    ) : 
    ((loading) ? 
    (
    <Container sx={{ borderLeft: 1, borderRight: 1, pt: 3, backgroundColor: "white", minHeight: "calc(100vh - 64px)" }}>
      <Typography variant="h2" sx={{ textAlign: "center", fontSize: "6ch", p: 1, pb: 4 }}> 
        Please log in to view this page.
      </Typography>
    </Container>
    ) : 
    (
    <Container sx={{ borderLeft: 1, borderRight: 1, pt: 3, backgroundColor: "white", minHeight: "calc(100vh - 64px)" }}>
      <Typography variant="h2" sx={{ textAlign: "center", fontSize: "6ch", p: 1, pb: 4 }}> 
        Welcome, {data.me.username}!
      </Typography>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: 1, 
        }}
      >
        <SnippetForm />
        <Divider orientation="vertical" flexItem />
        <Box sx={{flexGrow: 2, mx: 3}}>
          <Typography variant="h3" sx={{ textAlign: "center"}}> Your snippets: </Typography>
            <Box sx={{overflow: "auto"}}>
              {data.me.codeSnippets.map(snippet => {
                return (
                  <Card sx={{ margin: 2 }}>
                    <CardContent>
                      <Typography color="text.secondary" variant="h5" gutterBottom>
                        <Link underline="none" href={`/me/${snippet._id}`}>
                          {snippet.name} &nbsp;
                          <EditIcon fontSize="small" color="secondary" />
                        </Link>
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {snippet.description}
                      </Typography>
                      <Typography gutterBottom>
                        {snippet.code}
                      </Typography>
                      <Box 
                        sx={{ 
                          display: "flex", 
                          flexDirection: 'row', 
                          flexWrap: 'wrap',
                          justifyContent: 'flex-start',
                        }}
                      >
                      <Typography color="text.secondary">
                        Posted on {snippet.createdOn}
                      </Typography>
                      <Typography>
                        {bull}
                      </Typography>
                      <Typography color="text.secondary">
                        {snippet.language}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                </Card>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  ))
}

export default Dashboard;