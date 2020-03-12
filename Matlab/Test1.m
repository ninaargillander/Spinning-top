% Definiera alla konstanter
% S�tter ig�ng snurran
F = 2;             % Kraften som appliceras
delta_t = 0.1;     % Tiden under vilken en kraft appliceras

% Snurrans egenskaper
mass = 0.1;                 % Snurrans massa
r = 0.02;                   % Snurrans radie (l�ngst upp)
height = 0.07;                   % Snurrans h�jd
com = 3 * height / 4;       % Avst�ndet till masscentrum
g = 9.82;                   % Gravitationskonstanten


% Tr�gehtsmoment f�r snurran
Inertia = (3*mass*r*r)/10;
                  
% Ber�kna psi_dot
psi_dot = F*r*delta_t/Inertia;

% Ber�kna phi_dot
phi_dot = mass*g*com/(psi_dot*Inertia);


h= 1 / 60; % Stegl�ngd (f�r motivering se kommentarer i den implementerade koden)
N=1000; % Antal steg

% Startv�rden f�r psi och phi
psi(1) = 0;
phi(1) = 0;

% For-loop f�r att ber�kna allt m�jligt med hj�lp av Eulers stegmetod
for n=1:N
    
    psi(n+1) = Euler(psi(n), psi_dot, h);
    phi(n+1) = Euler(phi(n), phi_dot, h);
    
end

% Plotta resultaten fr�n loopen ovan.
t = 0:h:h*N;
plot(t,mod(psi,2*pi),'r');
title('Psi');
figure;
plot(t,mod(phi,2*pi),'r');
title('Phi');

% Koden nedan visar snurrans rotation, den inre cirkeln �r rotationen runt
% snurrans egen axel, den yttre cirkeln �r precessionen.
% Denna kod g�r tyv�rr att figurerna f�r psi och phi inte visas, s� man b�r
% inte k�ra detta kodparti samtidigt som kodpartiet f�r figurerna ovan,
% utan k�r dem ett i taget

% figure;
% for n =1:N
%     plot(r*cos(psi(n)), r*sin(psi(n)), '*');
%     axis([-1 1 -1 1]);
%     hold on;
%     plot(cos(phi(n)), sin(phi(n)), '*');
%     drawnow();
% end