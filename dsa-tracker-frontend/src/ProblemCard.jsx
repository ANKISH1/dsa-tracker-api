function ProblemCard({title, difficulty}){
    const colors = {
        EASY:'text-green-500',
        MEDIUM:'text-orange-500',
        HARD:'text-red-500',
    };

    return (
        <div className="border border-gray-300 p-4 mb-3 rounded-lg">
            <h3 style={{ margin: '0 0 8px' }}>{title}</h3>
            <span className={`font-bold text-sm ${colors[difficulty]}`}>
                {difficulty}
                </span>
                </div>    
    );
}

export default ProblemCard;