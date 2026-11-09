import { handleWaitlist } from "../../../_lib/waitlist";

export const POST = (request: Request) => handleWaitlist(request, "/examples/stackwise");
