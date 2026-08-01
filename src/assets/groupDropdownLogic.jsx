import { useState, useRef, useEffect } from "react"

export function GroupDropdown({ groups, value, onChange, disabled }) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const groupToggle = (groupId) => {
        const next = value.includes(groupId)
            ? value.filter(id => id !== groupId)
            : [...value, groupId]
        onChange(next)
    }

    const noSelectedGroups = () => {
        onChange([])
    }

    const label = value.length === 0
        ? "No groups"
        : `${value.length} group${value.length > 1 ? "s" : ""} selected`

    return (
        <div ref={containerRef} style={{ position: "relative" }}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(open => !open)}
            >
                {label}
            </button>

            {isOpen && (
                <div style={{ position: "absolute", border: "1px solid #ccc" }}>
                    <label style={{ display: "block" }}>
                        <input
                            type="checkbox"
                            checked={value.length === 0}
                            onChange={noSelectedGroups}
                        />
                        No groups
                    </label>

                    <hr />

                    {groups.map(group => (
                        <label key={group.id} style={{ display: "block" }}>
                            <input
                                type="checkbox"
                                checked={value.includes(String(group.id))}
                                onChange={() => groupToggle(String(group.id))}
                            />
                            {group.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}