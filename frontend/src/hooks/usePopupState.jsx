import { useState } from "react";

export default function usePopupState(defaultValue) {
    const [value, setValue] = useState(defaultValue);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setValue(defaultValue);
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        if (value === 'true' || value === "false") {
            value = JSON.parse(value);
        }
        setValue((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return {
        value,
        setValue,
        show,
        setShow,
        handleClose,
        handleChange,
    }
}