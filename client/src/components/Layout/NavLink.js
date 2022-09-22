import styled, { css } from "styled-components";

function isCurrent(to) {
  return window.location.pathname.startsWith(to);
}

function NavLink({ children, to, active = false }) {
  return (
    <LinkType
      href={to}
      active={active}
      aria-current={isCurrent(to) ? "page" : null}
    >
      {children}
    </LinkType>
  );
}

export default NavLink;

const LinkType = styled.a`
  position: relative;
  color:var(--gray-300);
  font-size: 14px;
  display: block;
  display: inline-block;
  padding:12px 25px 10px;

  ${(p) =>
    p.active &&
    css`
      color:var(--gray-800);
    `}
`;
