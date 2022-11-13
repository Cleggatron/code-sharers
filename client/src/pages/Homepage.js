import React from 'react';
import { useQuery } from '@apollo/client';
import {Box, Typography, Container, Divider, CircularProgress} from '@mui/material';

import { SNIPPETS } from '../utils/queries';
import HomepageCard from "../components/HomepageCard";

export default function Homepage() {
    const { isLoading, data } = useQuery(SNIPPETS, {
        fetchPolicy: "no-cache"
    });

    console.log(data)

    const snippetList = data ? data.snippets : [];

  return (isLoading) ? (
    <Container sx={{ textAlign: "center", borderLeft: 1, borderRight: 1, pt: "calc(10vh + 64px)", backgroundColor: "white", minHeight: "100vh" }}>
      <CircularProgress />
    </Container>
    ) : (
    <Container sx={{ 
        borderLeft: 1, 
        borderRight: 1, 
        pt: "100px", 
        backgroundColor: "white", 
        minHeight: "100vh"
     }}>
        <Typography variant="h2" sx={{ pb: 3 }}>
            Most recent posts:
        </Typography>
        <Divider />
        <Box>
            {snippetList.map((snippet) => {
                return (
                    HomepageCard(snippet)
                )
            })}
        </Box>
    </Container>
  );
}