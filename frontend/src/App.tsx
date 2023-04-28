import { useState, useCallback } from 'react';
import './test.css';

export function App() {
    const [count, setCount] = useState<number>(0);

    const onClick = useCallback(() => {
        setCount(val => val + 1);
    }, [])

    return (
        <>
            <div>{count}</div>
            <button onClick={onClick}>Increment</button>
        </>
    )
}