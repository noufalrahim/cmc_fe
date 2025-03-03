export const HeadingGenerator = (role: "admin" | "surgeon" | "anesthesia" | "nurse" | undefined) => {

    if (role === "surgeon") {
        return "Orthopedics";
    }
    else if (role === "anesthesia") {
        return "Anesthesia Unit";
    }
    else if (role === "nurse") {
        return "Nurse";
    }
    else {
        return "Unknown";
    }
};
