const SUPABASE_URL = 'https://lelzbotlbgnkrxzgmrec.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHpib3RsYmdua3J4emdtcmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMzkyNDEsImV4cCI6MjA5MTgxNTI0MX0.V7jYCgzbSZbGwNhMTINUaoxcsMt8ngqqFqh01ZGl3ew';

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const selectEl  = document.getElementById('player-select');
const playBtn   = document.getElementById('play-btn');
const errorMsg  = document.getElementById('error-msg');

async function loadPlayers() {
  const { data, error } = await client
    .from('player')
    .select('id, name')   // adjust columns to match your table
    .order('name');

  if (error) {
    errorMsg.textContent = 'Could not load players. Please try again.';
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    selectEl.innerHTML = '<option value="" disabled selected>No players found</option>';
    return;
  }

  selectEl.innerHTML = '<option value="" disabled selected>Select your name…</option>';
  data.forEach(player => {
    const opt = document.createElement('option');
    opt.value = player.id;       // store id as the value
    opt.textContent = player.name;
    selectEl.appendChild(opt);
  });
}

// Enable the button only when a player is selected
selectEl.addEventListener('change', () => {
  playBtn.disabled = !selectEl.value;
});

// Navigate to calendar page, passing the selected player as a URL param
playBtn.addEventListener('click', () => {
  const selectedId   = selectEl.value;
  const selectedName = selectEl.options[selectEl.selectedIndex].textContent;

  // Pass player info to the next page via query params
  const params = new URLSearchParams({ id: selectedId, name: selectedName });
  window.location.href = `calendar.html?${params.toString()}`;
});

loadPlayers();