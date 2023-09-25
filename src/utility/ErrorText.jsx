const ErrorText = ({form, field}) => {
    return <>
        <div className="text-danger">
            {
                form.touched[field] &&
                form.errors[field] &&
                (<div>{form.errors[field]}</div>)
            }
        </div>
    </>
}

export default ErrorText;