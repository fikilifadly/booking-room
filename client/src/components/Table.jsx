const Table = ({ fields, data, title }) => {
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
					{data.length ? (
						0 &&
						data.map((item, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								{fields.map((field) => (
									<td key={field}>{item[field[0]]}</td>
								))}
								<td>
									<button className="btn btn-ghost btn-xs" onClick={() => console.log("edit" + item.id)}>
										Edit
									</button>
									<button className="btn btn-ghost btn-xs" onClick={() => console.log("delete " + item.id)}>
										Delete
									</button>
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
