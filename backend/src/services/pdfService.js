const escapePdf = (value = '') => String(value).replace(/[\\()]/g, '\\$&');

const buildPdf = (title, rows) => {
  const lines = [
    'BT',
    '/F1 20 Tf',
    '50 790 Td',
    `(${escapePdf(title)}) Tj`,
    '/F1 11 Tf',
    '0 -34 Td',
    ...rows.flatMap(([label, value]) => [
      `(${escapePdf(`${label}: ${value || '-'}`)}) Tj`,
      '0 -18 Td',
    ]),
    'ET',
  ];
  const stream = lines.join('\n');
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    `5 0 obj\n<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ];
  let offset = 9;
  const xref = ['0000000000 65535 f '];
  const body = objects.map((object) => {
    const current = offset;
    offset += Buffer.byteLength(object);
    xref.push(`${String(current).padStart(10, '0')} 00000 n `);
    return object;
  }).join('');
  const trailer = `xref\n0 ${xref.length}\n${xref.join('\n')}\ntrailer\n<< /Size ${xref.length} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF`;
  return Buffer.from(`%PDF-1.4\n${body}${trailer}`);
};

module.exports = { buildPdf };
