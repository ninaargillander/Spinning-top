% Definiera alla konstanter
% Sätter igång snurran
F = 1;             % Kraften som appliceras
delta_t = 0.05;     % Tiden under vilken en kraft appliceras

% Snurrans egenskaper
mass = 0.1;                 % Snurrans massa
r = 0.02;                   % Snurrans radie (längst upp)
height = 0.07;                   % Snurrans höjd
com = 3 * height / 4;       % Avståndet till masscentrum
g = 9.82;                   % Gravitationskonstanten


% Trögehtsmoment
I1 = mass * ((3/20)*r*r + (3/80)*height*height);  % Tröghetsmoment vid lutning
I3 = (3*mass*r*r)/10; % Tröghetsmoment när rak (Vertikal om underlaget)
                  
% Beräkna psi_dot
psi_dot = F*r*delta_t/I3;

% Beräkna phi_dot
phi_dot = mass*g*com/(psi_dot*I1);

theta = pi / 12;

omega_spin = phi_dot * cos(theta) + psi_dot;
omega_prec(1) = 0;

h= 1 / 60; % step's size
N=1000; % number of steps

% Startvärden för psi och phi
psi(1) = 0;
phi(1) = 0;
prec(1) = 0;
spin(1) = 0;

% For-loop för att beräkna allt möjligt med hjälp av Eulers stegmetod
for n=1:N
    omega_prec(n+1) = abs(phi_dot*sin(theta)*sin(psi(n)));
    
    prec(n+1) = Euler(prec(n), omega_prec(n), h);
    spin(n+1) = Euler(spin(n), omega_spin, h);
    psi(n+1) = Euler(psi(n), psi_dot, h);
    phi(n+1) = Euler(phi(n), phi_dot, h);
    
end

% Plotta resultaten från loopen ovan.
t = 0:h:h*N;
plot(t,mod(psi,2*pi),'r');
title('Psi');
figure;
plot(t,mod(phi,2*pi),'r');
title('Phi');
figure;
plot(t,mod(spin,2*pi),'r');
title('Spin');
figure;
plot(t,mod(prec,2*pi),'r');
title('Prec');


% Koden nedan visar snurrans rotation, den inre cirkeln är rotationen runt
% snurrans egen axel, den yttre cirkeln är precessionen.
% Denna kod gör tyvärr att figurerna för psi och phi inte visas, så man bör
% inte köra detta kodparti samtidigt som kodpartiet för figurerna ovan,
% utan kör dem ett i taget

% figure;
% for n =1:N
%     plot(r*cos(psi(n)), r*sin(psi(n)), '*');
%     axis([-1 1 -1 1]);
%     hold on;
%     plot(cos(phi(n)), sin(phi(n)), '*');
%     drawnow();
% end