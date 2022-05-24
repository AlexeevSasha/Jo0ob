import {Status} from "../api/job/jobDto";

export  const colors = (stat: Status): string => {
    switch (stat) {
        case "interview":
            return "#6969cd";
        case "declined":
            return "#c70fa8";
        case "pending":
            return "#039b46";
    }
}