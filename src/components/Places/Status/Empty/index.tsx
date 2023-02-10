import {Box, Typography} from "@mui/material";
import {SentimentVeryDissatisfied} from "@mui/icons-material";

const EmptyResults = () => {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    marginBottom: '4px'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.25rem'
                    }}
                >No Results Found</Typography>
            </Box>
            <SentimentVeryDissatisfied
                fontSize={"large"}
            />
        </Box>
    )
}

export default EmptyResults;