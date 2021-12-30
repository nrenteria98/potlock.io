import { Card } from 'antd';
import { useEffect } from 'react';

function Results(props) {

  return (
    <Card style={{ margin: "2vw", zIndex: 2, overflow: "scroll", maxHeight:300 }}>
        {props.results.map((result) => (
                    <p>{result.song} by {result.artists.join(", ")} from {result.playlist}</p>
                ))}
    </Card>

  );
};

export default Results;