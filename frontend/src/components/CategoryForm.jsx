import PropTypes from 'prop-types';

const CategoryForm = ({value, setValue, handleSubmit, handleDelete, buttonText = "Submit"}) => {
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit} className="space-y-3">
                <input 
                    type="text" 
                    className="py-3 px-4 border rounded-lg w-full" 
                    placeholder="Write category name" 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className="flex justify-between">
                    <button className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">{buttonText}</button>
                    {handleDelete && (
                        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}


CategoryForm.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func,
    buttonText: PropTypes.string
};


export default CategoryForm;