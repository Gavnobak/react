import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import RecipeItem from "./RecipeItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Slider from "@material-ui/core/Slider";
import {Context} from "../context";
import Button from "@material-ui/core/Button";

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
        margin: theme.spacing(3),
    },
}));

function FilterModal({filters,caloricityRange}) {

    const {acceptFilters} = useContext(Context)
    const classes = useStyles();
    const checkboxes = ["Caribbean","Greek","French", "Indian","Chinese"]
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const marks = [
        {
            value: 100,
            label: '100',
        },
        {
            value: 1200,
            label: '1200',
        },
    ];
    function valuetext(value) {
        return `${value}`;
    }
    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    {filters.map((cuisin,index) => {
                            return <FormControlLabel
                                value={cuisin.value}
                                control={<Checkbox color="primary"/>}
                                label={cuisin.title}
                                key={index}
                                labelPlacement="start"
                                onChange={acceptFilters}
                            />
                        })}
                    <Slider
                        defaultValue={caloricityRange}
                        getAriaValueText={valuetext}
                        aria-labelledby="range-slider"
                        step={100}
                        min={caloricityRange[0]}
                        max={caloricityRange[1]}
                        marks={marks}
                        valueLabelDisplay="on"
                        onChange={(event) => { console.log(event.target); }}
                    />
                </FormGroup>
                <Button variant="contained" color="primary" href="#contained-buttons" onClick={() => { console.log('onClick'); }}>
                    Accept
                </Button>
            </FormControl>
        </div>
    );

    return (
        <div>
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
        </div>
    );
}

export default FilterModal