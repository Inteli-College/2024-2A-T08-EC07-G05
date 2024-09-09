export default function InputBar({ onChange }) {
    return (
        <input
            type="text"
            id="knr_input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Insira o KNR no formato 0000-0000000"
            pattern="\d{4}-\d{7}"
            required
            onChange={onChange}
        />
    );
}
