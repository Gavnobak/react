import React from 'react';
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

function FilterModal(props) {
    //let [filters, setFilters] = React.useState({});
    const classes = useStyles();
    //const {filters, getFilters} = props
    const checkboxes = ["Caribbean","Greek","French", "Indian","Chinese"]
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        //if (!filters && !filters.length)
            //getFilters()
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
                    {/*{filters.cuisines && filters.cuisines.length ?*/}
                    {/*    Object.keys(filters.cuisines).map((cuisin) => {*/}
                    {/*        return <FormControlLabel*/}
                    {/*            value={cuisin}*/}
                    {/*            checked={filters.cuisines[cuisin]}*/}
                    {/*            control={<Checkbox color="primary"/>}*/}
                    {/*            label={cuisin}*/}
                    {/*            labelPlacement="start"*/}
                    {/*        />*/}
                    {/*    }) : <div>No cuisines</div>}*/}
                    {checkboxes.map((cuisin,index) => {
                            return <FormControlLabel
                                value={cuisin}
                                control={<Checkbox color="primary"/>}
                                label={cuisin}
                                key={index}
                                labelPlacement="start"
                            />
                        })}
                    <Slider
                        defaultValue={80}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-always"
                        step={100}
                        marks={marks}
                        valueLabelDisplay="on"
                    />
                </FormGroup>
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