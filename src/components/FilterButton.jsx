export default function FilterButton({ field, onChangeSort }) {
    return (
      <div className="relative mb-6 inline-block">
        <select
          onChange={(e) => onChangeSort(e.target.value)}
          id={`filter-${field}`}
          name={field}
          className="
            appearance-none
            bg-gray-900
            text-white
            border border-gray-700
            rounded-lg
            px-4 py-2
            pr-8
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-purple-500 focus:border-transparent
            hover:border-purple-400
            transition-colors duration-200
            cursor-pointer
          "
          defaultValue=""
        >
          <option value="" disabled>
            Sort by
          </option>
          <option value="az">A - Z</option>
          <option value="rate">Rate</option>
        </select>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 top-1.9 flex items-center pr-3">
          <svg
            className="h-4 w-4 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  }