// src/Components/YourArea.jsx
import { useState, useEffect, useRef } from 'react'
import { booths } from '../Data/Booths'
import BoothCard from './BoothCard'


const QUICK_SEARCHES = [
    'Salt Lake', 'Park Street', 'Jadavpur', 'Howrah', 'Barasat', 'Dum Dum',
]

function YourArea() {
    const [query, setQuery] = useState('')
    const [booth, setBooth] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [liveQueue, setLiveQueue] = useState(0)
    const [liveVoted, setLiveVoted] = useState(0)
    const [lastUpdated, setLastUpdated] = useState(new Date())
    const intervalRef = useRef(null)

    // Clean up interval on unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current)
    }, [])

    function findBooth(input) {
        const q = input.trim().toLowerCase()
        if (!q) return

        clearInterval(intervalRef.current)

        const found = booths.find((b) =>
            b.locality.some((l) => l.includes(q) || q.includes(l))
        )

        if (!found) {
            setBooth(null)
            setNotFound(true)
            return
        }

        setNotFound(false)
        setBooth(found)
        setLiveQueue(found.queueLength)
        setLiveVoted(found.votedSoFar)
        setLastUpdated(new Date())

        // Simulate live updates every 15 seconds
        intervalRef.current = setInterval(() => {
            setLiveQueue((prev) => Math.max(0, prev + Math.floor(Math.random() * 5) - 2))
            setLiveVoted((prev) => Math.min(found.totalVoters, prev + Math.floor(Math.random() * 3)))
            setLastUpdated(new Date())
        }, 15000)
    }

    function handleQuickSearch(area) {
        setQuery(area)
        findBooth(area)
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') findBooth(query)
    }

    return (
        <div className="your-area-page">

            <div className="your-area-header">
                <h1 className="your-area-title">Your Area</h1>
                <p className="your-area-subtitle">
                    Enter your locality, area name, or PIN code to check the live
                    queue at your nearest voting booth.
                </p>
            </div>

            {/* Search bar */}
            <div className="search-row">
                <input
                    type="text"
                    className="search-input"
                    placeholder="e.g. Salt Lake, Park Street, 700016…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-btn" onClick={() => findBooth(query)}>
                    Find Booth
                </button>
            </div>

            {/* Quick search chips */}
            <div className="chips-row">
                {QUICK_SEARCHES.map((area) => (
                    <button
                        key={area}
                        className="chip"
                        onClick={() => handleQuickSearch(area)}
                    >
                        {area}
                    </button>
                ))}
            </div>

            {/* Results */}
            {notFound && (
                <div className="not-found">
                    No booth found for <strong>"{query}"</strong>. Try a different
                    area name or PIN code.
                </div>
            )}

            {booth && !notFound && (
                <BoothCard
                    booth={booth}
                    liveQueue={liveQueue}
                    liveVoted={liveVoted}
                    lastUpdated={lastUpdated}
                />
            )}

            {!booth && !notFound && (
                <div className="empty-state">

                    <div className="empty-title">Search for your area above</div>
                    <div className="empty-sub">
                        We'll show you the current queue, wait time, and booth details.
                    </div>
                </div>
            )}

        </div>
    )
}

export default YourArea