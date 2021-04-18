import React, { useRef } from 'react';

import classes from './events-search.module.css';
import Button from '../../ui/button/button';

export default function EventsSearch(props: EventsSearchProps) {
    const yearInputRef = useRef<HTMLSelectElement>();
    const monthInputRef = useRef<HTMLSelectElement>();

    function submitHandler(event: React.FormEvent) {
        event.preventDefault();

        const selectedYear = yearInputRef.current.value;
        const selectedMonth = monthInputRef.current.value;
        console.log(selectedYear, selectedMonth);

        props.onSearch(selectedYear, selectedMonth);
    }

    return (
        <form
            className={classes.form}
            onSubmit={(event) => submitHandler(event)}
        >
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year" ref={yearInputRef}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="month">Month</label>
                    <select id="month" ref={monthInputRef}>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">Setember</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <Button>Find Event</Button>
            </div>
        </form>
    );
}

interface EventsSearchProps {
    onSearch: (selectedYear: string, selectedMonth: string) => void;
}
