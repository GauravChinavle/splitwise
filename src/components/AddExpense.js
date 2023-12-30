import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {Box,TextField, Button, InputLabel, MenuItem, Select, FormControl, Radio, RadioGroup, FormControlLabel, OutlinedInput, Chip } from "@mui/material";
const ITEM_HEIGHT = 24;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 250,
        },
    },
};

function getStyles(name, memberName, theme) {
    return {
        fontWeight:
            memberName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const ColorButton = styled(Button)(({ theme }) => ({
    color: "#0063cc",
    height: "38px",
    fontSize: "11px",
    textColor: "#0063cc",
    marginTop: "5%",
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
    color: theme.palette.getContrastText("#0063cc"),
    width: "100%",
    height: "20px",
    fontSize: "10px",
    textAlign: "right",
    marginTop: "5%",
}));

export default function AddExpense({
    members,
    expenses,
    setExpenses,
}) {
    const theme = useTheme();
    const handleOnClick = () => {
        const newExpenses = [...expenses];
        newExpenses.push({
            expenseName: "",
            amount: 0,
            paidBy: "",
            splitWith: [],
        });
        setExpenses(newExpenses);
    };

    const handleOnRemove = (index) => {
        const newExpenses = [...expenses];
        newExpenses.splice(index, 1);
        setExpenses(newExpenses);
    };

    const handleOnChange = (event, index) => {
        const {
            target: { value, name },
        } = event;
        const newExpenses = [...expenses];
        newExpenses[index][name] = name == 'amount' ? parseInt(value) : value;
        setExpenses(newExpenses);
    };

    const handleRadioChange = (event, index) => {
        const {
            target: { value },
        } = event;

        const newExpense = [...expenses];
        newExpense[index].split = value;
        newExpense[index].splitWith = members
            .filter((m) => m.name !== newExpense[index].paidBy)
            .map((m) => m.name);

        setExpenses(newExpense);
    };

    return (
        <Box sx={{ width: "90%", margin: "5%", textAlign: "center" }}>
            {expenses.map((expense, index) => {
                return (
                    <div>
                        <div className="row" >

                            <div className="col" >
                                <InputLabel id="demo-simple-select-label" style={{ float: "left" }}>{`Expense ${index + 1
                                    }`}</InputLabel>
                            </div>

                            {index !== 0 && (
                                <div className="col" >
                                    <ColorButton onClick={() => handleOnRemove(index)} style={{ top: "-12px", float: "right" }}>
                                        Remove
                                    </ColorButton>
                                </div>

                            )}

                        </div>

                        <div className="row" >
                            <div className="col" id={`text_field_${index}`}>
                                <TextFieldStyled
                                    key={index}
                                    id="outlined-basic"
                                    label={`Name`}
                                    variant="outlined"
                                    size="small"
                                    name="expenseName"
                                    value={expense?.expenseName}
                                    onChange={(e) => handleOnChange(e, index)}
                                />
                            </div>

                            <div className="col" id={`text_field_${index}`}>
                                <TextFieldStyled
                                    key={index}
                                    id="outlined-basic"
                                    label={`Amount`}
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    name="amount"
                                    value={(expense?.amount).toString()}
                                    onChange={(e) => handleOnChange(e, index)}
                                />
                            </div>
                        </div>
                        <div className="row" id={`text_field_${index}`}>
                            <FormControl
                                sx={{ m: 1, minWidth: 120, top: "-9px" }}
                                size="small"
                                style={{ marginTop: "5%" }}
                            >
                                <InputLabel
                                    id="demo-simple-select-label"
                                    style={{ marginTop: "5%" }}
                                >
                                    Paid by
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={expense?.paidBy}
                                    name="paidBy"
                                    label="Paid by"
                                    onChange={(e) => handleOnChange(e, index)}
                                    style={{ marginTop: "6%" }}
                                >
                                    {members?.map((member, index) => {
                                        console.log("member", member);
                                        return (
                                            <MenuItem value={member.name}>{member.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="row">

                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="Split equally"
                                        value="equally"
                                        name="split"
                                        onChange={(e) => handleRadioChange(e, index)}
                                    />
                                    <FormControlLabel
                                        value="specific"
                                        control={<Radio />}
                                        label="Split with specific"
                                        name="split"
                                        onChange={(e) => handleOnChange(e, index)}
                                        disabled={members?.length == 2}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {expense.split == "specific" && (
                            <div className="row">

                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-chip-label">
                                        Members
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        name="splitWith"
                                        value={expense.splitWith}
                                        onChange={(e) => handleOnChange(e, index)}
                                        input={
                                            <OutlinedInput
                                                id="select-multiple-chip"
                                                label="Members"
                                            />
                                        }
                                        renderValue={(selected) => (
                                            <Box
                                                sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                                            >
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {members
                                            .filter((m) => m.name != expense?.paidBy)
                                            .map((m) => (
                                                <MenuItem
                                                    key={m.name}
                                                    value={m.name}
                                                    style={getStyles(m.name, expense.splitWith, theme)}
                                                >
                                                    {m.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </div>
                        )}
                    </div>
                );
            })}
            <div>
                <div className="col" style={{ textAlign: "right" }}>
                    <ColorButton onClick={handleOnClick}>Add expense</ColorButton>
                </div>
            </div>
        </Box>
    );
}
