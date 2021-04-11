import React, {useContext} from 'react';
import {Context} from "../context";
import {makeStyles} from '@material-ui/core/styles';
import {
    Modal,
    IconButton,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormGroup,
    Slider,
    Button,
    Typography,
    Divider,
    Backdrop,
    Box,
    Icon
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    paper: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 440,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        // непобедимый бордер уходит когда открываешь консоль и выбор элемента
        // borderColor: 'rgba(0, 0, 0, 0)',
        // border: '0px',
        padding: theme.spacing(2, 4, 3),
    },
    margin: {
        left: theme.spacing(2),
        width: "56px",
        height: "56px",
        border: '1px solid',
        borderColor: theme.styles.shade20,
        borderRadius: 28,
    },
    formControl: {
        width: "100%",
        height: '90%',
        top: theme.spacing(2),
        paddingBottom: theme.spacing(3),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.styles.shade50,
    },
    root: {
        marginLeft: 'auto',
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
        marginLeft: 'auto',
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
        display: 'flex',
    },
    iconColor: {
        color: theme.styles.base0,
    },
}));

function FilterModal() {
    const {acceptFilters, filters, setFilters} = useContext(Context)
    const classes = useStyles();
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
        let newCuisines = filters.cuisines?.map((cuisine) => {
            return {...cuisine, value: true}
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
        <div className={classes.paper}>
            <Typography variant="h3" gutterBottom>
                Filter
            </Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} size={'small'}>
                <CloseIcon/>
            </IconButton>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup style={{paddingBottom: '50px'}}>
                    {filters.cuisines ? filters.cuisines.map((cuisin, index) => {
                        return <React.Fragment key={index}>
                            <FormControlLabel
                                style={{marginLeft: '0px'}}
                                checked={cuisin.value}
                                control={<Checkbox color="default" classes={{
                                    root: classes.root,
                                    checked: classes.checked
                                }}/>}

                                label={<Typography
                                    variant="body1">{cuisin.title}</Typography>}
                                key={index}
                                labelPlacement="start"
                                onChange={() => changeCheckbox(index)}
                            />
                            <Divider light/>
                        </React.Fragment>
                    }) : <div>Empty</div>}
                    {filters.caloricityRange ?
                        <React.Fragment>
                            <Slider
                                // тут я думаю что как и в инпуте лагает слайдер из-за изменений стейта
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
                <Icon className={classes.iconColor}>filter_list</Icon>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                BackdropComponent={Backdrop}
                BackdropProps={{
                    style: {backgroundColor: 'white', opacity: '0.8'},
                    timeout: 500,
                }}
            >
                {body}
            </Modal>
        </React.Fragment>
    );
}

export default FilterModal