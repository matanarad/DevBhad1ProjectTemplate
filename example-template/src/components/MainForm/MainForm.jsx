import { useEffect, useState } from 'react';
import axios from 'axios';
import Hebcal from 'hebcal';

import './MainForm.css';
function MainForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [dots, setDots] = useState('');
    const month_in_hebrow = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי",
        "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [teamNumber, setTeamNumber] = useState('');
    const [context, setContext] = useState('');

    useEffect(() => {
        // Get the current date in the Hebrew calendar
        const today = new Hebcal.HDate();

        // Format the Hebrew date as a string
        const hebrewDateStr = today.toString('h');

        // Split the date string into an array
        const hebrewDateArray = hebrewDateStr.split(' ');
        console.log(hebrewDateArray)
        // Set the Hebrew date in the state
        // setHebrewDate(hebrewDateArray.join(' '));
    }, []);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                console.log("asd")
                setDots((prevDots) => {
                    return prevDots === '...' ? '' : prevDots + '.';
                });
            }, 500); // Change the dots every 500ms

            return () => clearInterval(interval);
        }
    }, [isLoading]);

    function convertToPDF() {
        try {
            // Replace with your Google Apps Script web app URL
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbxT4_MCo0uc3jiIpSg1aNY5OoaDvLUZeXEefrPbP01_gm5sN-LjWcBk5FnzmitX8vPL/exec';
            setIsLoading(true)

            const currentDate = new Date();
            const today = new Hebcal.HDate();
            const hebrewDateStr = today.toString('h');
            const hebrewDateArray = hebrewDateStr.split(' ');

            // Create a FormData object
            const formData = new FormData();
            formData.append('title', title);
            formData.append('context', context);
            formData.append('full_name', fullName);
            formData.append('team_number', teamNumber);
            formData.append('g_day', currentDate.getDate());
            formData.append('g_month', "ב" + month_in_hebrow[currentDate.getMonth()]);
            formData.append('g_year', currentDate.getFullYear());
            formData.append('h_day', hebrewDateArray[0]);
            formData.append('h_month', hebrewDateArray[1]);
            formData.append('h_year', hebrewDateArray[2]);

            axios.post(scriptUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the Content-Type header to multipart/form-data
                },
            })
                .then((response) => {
                    setIsLoading(false);
                    console.log(response)
                    window.open(response.data, '_blank');
                })
                .catch((error) => {
                    setIsLoading(false);
                });
            // axios
            //     .post(scriptUrl, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data', // Important for FormData
            //         },
            //     })
            //     .then((response) => {
            //         console.log(response.data)
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //     });

        } catch (error) {
            console.error('An error occurred while converting to PDF.');
        }
    }
    return (
        <div className="main-form">
            <div className='input-block'>
                <label className='form-input-lable'>כותרת העבודה</label>
                <input type='text' className='form-input' dir='rtl' value={title} onChange={(value) => { setTitle(value.target.value) }}></input>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>שם מלא</label>
                <input type='text' className='form-input' dir='rtl' value={fullName} onChange={(value) => { setFullName(value.target.value) }}></input>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>צוות</label>
                <input type='text' className='form-input' dir='rtl' value={teamNumber} onChange={(value) => { setTeamNumber(value.target.value) }}></input>
            </div>
            <div className='input-block'>
                <label className='form-input-lable'>תוכן העבודה</label>
                <textarea className='form-input textarea' dir='rtl' style={{ height: "37vh" }} value={context} onChange={(value) => { setContext(value.target.value) }}></textarea>
            </div>
            <button
                className={`submit-button ${isLoading ? 'loading' : ''}`}
                onClick={convertToPDF}
                disabled={isLoading}
            >
                {isLoading ? `${dots}מייצר את העבודה` : `הורד עבודה`}
            </button>

        </div>

    );
}

export default MainForm;
