import tw, { css } from "twin.macro"

export default css`
	table {
		width: calc(100% - 1px);
		${tw`mb-2 border-collapse table-auto leading-normal`}
	}

	thead {
		${tw`font-bold text-left text-gray-800`}
	}

	tr > td,
	tr > th {
		${tw`transition text-gray-900 bg-white whitespace-nowrap box-border`}
	}

	td {
		${tw`px-3 py-2 border border-gray-300`}
	}

	th {
		${tw`px-3 py-3`}
	}

	tbody tr:nth-of-type(odd) > td {
		${tw`bg-gray-300`}
	}

	tbody tr:hover > td {
		${tw`bg-blue-300`}
	}
`
