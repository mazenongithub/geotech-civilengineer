class MakeID {

       projectID() {
        // Use browser crypto API if available
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
            return `gfk_${crypto.randomUUID()}`;
        }

        // Fallback (still very low collision risk)
        return `gfk_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    }

}

export default MakeID;