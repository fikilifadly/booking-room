const Table = ({ fields, data, loading }) => {
	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				{/* head */}
				<thead>
					<tr>
						<th>No</th>
						{fields.map((field) => (
							<th key={field[0]}>{field[0]}</th>
						))}
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					{!loading && data.length > 0 ? (
						data.map((item, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								{fields.map((field) => (
									<td key={field}>{item[field[0]]}</td>
								))}
								<td>
									<div className="flex gap-3">
										<button className="bg-yellow-400 px-5 py-2 rounded-md text-xs" onClick={() => console.log("edit" + item.id)}>
											Edit
										</button>
										<button className="bg-red-600 px-5 py-2 rounded-md text-xs text-white" onClick={() => console.log("delete " + item.id)}>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={fields.length + 2} className="text-center font-bold text-2xl">
								No Data Available
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
