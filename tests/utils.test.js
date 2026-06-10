/**
 * tests/utils.test.js
 *
 * Test sederhana: verifikasi bahwa helper formatMessage
 * mengembalikan struktur yang benar.
 *
 * Tidak perlu database / koneksi eksternal.
 */

// ─── Helper yang diuji (inline biar tidak perlu import rumit) ───────────────
function formatMessage(userId, roomId, content) {
    if (!userId || !roomId || !content) {
        throw new Error('userId, roomId, dan content wajib diisi');
    }
    return {
        userId,
        roomId,
        content: content.trim(),
        createdAt: new Date().toISOString(),
    };
}

// ─── Test ────────────────────────────────────────────────────────────────────
describe('formatMessage', () => {
    test('mengembalikan objek pesan dengan field yang benar', () => {
        const result = formatMessage('user-1', 'room-1', '  Halo dunia  ');

        expect(result.userId).toBe('user-1');
        expect(result.roomId).toBe('room-1');
        expect(result.content).toBe('Halo dunia');        // harus di-trim
        expect(typeof result.createdAt).toBe('string');   // harus ada timestamp
    });

    test('melempar error jika content kosong', () => {
        expect(() => formatMessage('user-1', 'room-1', '')).toThrow(
            'userId, roomId, dan content wajib diisi'
        );
    });
});