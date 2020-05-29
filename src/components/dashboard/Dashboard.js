import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        '& > *': {
            marginTop: theme.spacing(1),
        }
    },
    paper: {
        marginTop: theme.spacing(15),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const theme = createMuiTheme();

theme.typography.h1 = {
    fontSize: '2rem'
}

const recordings = [
    {
        title: 'Birlinn',
        createdAt: 'Monday, May 25 @ 6:30am'
    },
    {
        title: 'Morag',
        createdAt: 'Monday, May 13 @ 7:45pm'
    },
    {
        title: 'Uibhist',
        createdAt: 'Monday, May 1 @ 6:31am'
    }
];

function Recordings(props) {
    const recordings = props.recordings;
    const recordingList = recordings.map((recording) =>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={recording.title}
                secondary={recording.createdAt}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        
    );
    return (
        <List>
            {recordingList}
            <Button variant="contained" color="primary">New Recording</Button>
        </List>
    )
}

export default function Dashboard() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item sm={6}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h1" gutterBottom>
                                        Recent Recordings
                                </Typography>
                                    <Grid item>
                                        <div>
                                            <Recordings recordings={recordings} />
                                        </div>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm={6} style={{ paddingTop: theme.spacing(15) }}>
                                <Typography variant="h2">Hello, adamhannadev!</Typography>
                                <form className={classes.form} noValidate autoComplete="off">
                                    <TextField id="name" label="Outlined" variant="outlined" fullWidth label="User Name" />
                                    <TextField id="email" label="Outlined" variant="outlined" fullWidth label="Email" />
                                    <TextField id="phone" label="Outlined" variant="outlined" fullWidth label="Password" />
                                    <Button variant="contained" color="primary">
                                        Update
                                </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </ThemeProvider>
        </React.Fragment >
    );
}