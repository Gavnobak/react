import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Slider from "@material-ui/core/Slider";
import {Context} from "../context";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import RecipeItem from "./RecipeItem";
import Box from "@material-ui/core/Box";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        width: "100%"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.styles.shade50,
    },
    root: {
        marginLeft:'auto',
        '&$checked': {
            color: theme.styles.shade50,
        },
    },
    checked: {},
    slider: {
        height: theme.spacing(8),
        top: theme.spacing(8),
        color: theme.styles.shade50,
    },
    buttonAccept: {
        marginLeft:'auto',
        width: '143px',
        height: '36px',
        color: 'white',
        backgroundColor: theme.styles.shade50,
        '&:hover': {
            backgroundColor: theme.styles.shade50,
        },
        alignSelf: "right"
    },
    buttonClear: {
        border: '1px solid',
        width: '78px',
        height: '36px',
        borderColor: theme.styles.shade50,
        color: theme.styles.shade50,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
    },
    boxButtons: {
        display: 'flex'
    }
}));

function FilterModal({filters, setFilters}) {

    const {acceptFilters} = useContext(Context)
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    function valuetext(value) {
        return `${value}`;
    }

    const handleClose = () => {
        setOpen(false);
    };

    function clearFilters() {
        let newCuisines = filters.cuisines?.map((cuisine, index) => {
            return {...cuisine, value:true}
        })
        setFilters({...filters, cuisines: newCuisines, caloricityCurrent: filters.caloricityRange})
    }

    function changeCheckbox(index) {
        let newCuisines = filters.cuisines.slice()
        newCuisines[index].value = !newCuisines[index].value
        setFilters({...filters, cuisines: newCuisines})
    }

    function changeCaloricity(value) {
        setFilters({...filters, caloricityCurrent: value})
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h3" gutterBottom>
                Filter
            </Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} size={'small'}>
                <CloseIcon/>
            </IconButton>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    {filters.cuisines ? filters.cuisines.map((cuisin, index) => {
                        return <React.Fragment>
                            <FormControlLabel
                                checked={cuisin.value}
                                control={<Checkbox classes={{
                                    root: classes.root,
                                    checked: classes.checked
                                }}/>}

                                label={<Typography
                                    variant="body1">{cuisin.title}</Typography>}
                                key={index}
                                labelPlacement="start"
                                onChange={event => changeCheckbox(index)}
                            />
                            <Divider light/>
                        </React.Fragment>
                    }) : <div>Empty</div>}
                    {filters.caloricityRange ?
                        <React.Fragment>
                            <Slider
                                value={filters.caloricityCurrent}
                                getAriaValueText={valuetext}
                                aria-labelledby="range-slider"
                                className={classes.slider}
                                step={100}
                                min={filters.caloricityRange[0]}
                                max={filters.caloricityRange[1]}
                                valueLabelDisplay="on"
                                onChange={(event, value) => {
                                    changeCaloricity(value);
                                }}
                            />
                            <Typography variant="body1">Calories, kCal</Typography>
                        </React.Fragment> : <div>Empty</div>}

                </FormGroup>
                <Box className={classes.boxButtons}>
                    <Button variant="contained"
                            color="primary"
                            disableElevation={true}
                            className={classes.buttonClear}
                            onClick={clearFilters}>
                        Clear
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            disableElevation={true}
                            className={classes.buttonAccept}
                            onClick={acceptFilters}>
                        Show Recipes
                    </Button>
                </Box>

            </FormControl>
        </div>
    );

    return (
        <React.Fragment>
            <IconButton aria-label="delete" className={classes.margin} onClick={handleOpen}>
                <ArrowDownwardIcon fontSize="inherit"/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </React.Fragment>
    );
}

export default FilterModal