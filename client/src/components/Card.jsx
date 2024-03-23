const Card = ({ data }) => {
	return (
		<>
			<div className="flex flex-col justify-between p-5 shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05),0px_0px_0px_1.5px_rgba(0,0,0,0.08)] rounded-md">
				<div className="flex justify-between">
					<span>{data.title}</span>
				</div>

				<div className="mt-5">
					<span className="text-4xl font-bold">{data.loading ? <span className="loading loading-spinner loading-md"></span> : data.total}</span>
				</div>
			</div>
		</>
	);
};

export default Card;
