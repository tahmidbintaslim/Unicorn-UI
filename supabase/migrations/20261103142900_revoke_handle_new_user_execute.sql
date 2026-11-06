-- The sign-up trigger runs as a trigger only; nobody should call it over the API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
