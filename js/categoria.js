/* ============================================================
   categoria.js
   - Paginación (si la página la tiene)
   - Modal: usa el evento show.bs.modal de Bootstrap para
     leer los datos JUSTO cuando el modal está por abrirse.
     Esto evita el conflicto entre Bootstrap y el click del botón.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. PAGINACIÓN (solo si la página tiene los botones)
  ============================================================ */
  const gridProductos = document.querySelector('[id^="grid"]');
  const btnAnterior = document.getElementById('btnAnterior');
  const btnSiguiente = document.getElementById('btnSiguiente');
  const botonesPagina = document.querySelectorAll('.btn-num-pagina');

  if (gridProductos && btnAnterior && btnSiguiente && botonesPagina.length > 0) {

    const productosPorPagina = 5;
    let paginaActual = 1;
    const columnas = Array.from(gridProductos.children);
    const totalPaginas = Math.ceil(columnas.length / productosPorPagina);

    function mostrarPagina(pagina) {
      paginaActual = pagina;
      const inicio = (paginaActual - 1) * productosPorPagina;
      const fin = inicio + productosPorPagina;

      columnas.forEach(function (col, i) {
        col.classList.toggle('d-none', i < inicio || i >= fin);
      });

      botonesPagina.forEach(function (btn) {
        const num = parseInt(btn.getAttribute('data-pagina'));
        btn.closest('.page-item').classList.toggle('active', num === paginaActual);
      });

      btnAnterior.classList.toggle('disabled', paginaActual === 1);
      btnSiguiente.classList.toggle('disabled', paginaActual === totalPaginas);
    }

    botonesPagina.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        mostrarPagina(parseInt(btn.getAttribute('data-pagina')));
        document.querySelector('.categoria-header').scrollIntoView({ behavior: 'smooth' });
      });
    });

    btnAnterior.addEventListener('click', function (e) {
      e.preventDefault();
      if (paginaActual > 1) {
        mostrarPagina(paginaActual - 1);
        document.querySelector('.categoria-header').scrollIntoView({ behavior: 'smooth' });
      }
    });

    btnSiguiente.addEventListener('click', function (e) {
      e.preventDefault();
      if (paginaActual < totalPaginas) {
        mostrarPagina(paginaActual + 1);
        document.querySelector('.categoria-header').scrollIntoView({ behavior: 'smooth' });
      }
    });

    mostrarPagina(1);
  }


  /* ============================================================
     2. MODAL
     
     ¿Por qué usamos show.bs.modal en vez de click?
     
     Bootstrap maneja el clic del botón internamente para abrir
     el modal. Si nosotros también escuchamos el clic, a veces
     el JS corre DESPUÉS de que Bootstrap ya abrió el modal vacío.
     
     show.bs.modal es un evento que Bootstrap dispara justo ANTES
     de mostrar el modal, y nos entrega en event.relatedTarget
     el botón exacto que lo abrió. Así leemos los datos sin
     ningún conflicto.
  ============================================================ */
  const modal = document.getElementById('modalProducto');

  if (modal) {

    // Este evento se dispara justo antes de que el modal se muestre
    modal.addEventListener('show.bs.modal', function (event) {

      // event.relatedTarget → el botón que abrió el modal
      const boton = event.relatedTarget;

      // Leer los datos del botón
      const nombre = boton.getAttribute('data-nombre') || '—';
      const desc = boton.getAttribute('data-desc') || '—';
      const precio = boton.getAttribute('data-precio') || '—';
      const stock = boton.getAttribute('data-stock') || '0';

      // Escribirlos en el modal
      document.getElementById('modalNombre').textContent = nombre;
      document.getElementById('modalDesc').textContent = desc;
      document.getElementById('modalPrecio').textContent = precio;

      const spanStock = document.getElementById('modalStock');
      if (stock === '0') {
        spanStock.textContent = 'Sin stock';
        spanStock.style.color = '#c0392b';
      } else {
        spanStock.textContent = stock + ' disponibles';
        spanStock.style.color = '#7a6a50';
      }
    });

    // Limpiar el modal al cerrarse
    modal.addEventListener('hide.bs.modal', function () {
      document.getElementById('modalNombre').textContent = '—';
      document.getElementById('modalDesc').textContent = '—';
      document.getElementById('modalPrecio').textContent = '—';
      document.getElementById('modalStock').textContent = '—';
      document.getElementById('modalStock').style.color = '';
    });
  }

}); // fin DOMContentLoaded