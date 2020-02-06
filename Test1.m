F = 1;
m = 0.5;
r = 0.02;
delta_t = 1;
I = (3*m*r*r)/10;

psi_dot = F*r*delta_t/I;

h=0.001; % step's size
N=100; % number of steps
psi(1) = 0;
for n=1:N
psi(n+1) = Euler( psi(n), psi_dot, h);
end

t = 1:h:h*N+1;
plot(t,mod(psi,2*pi),'r')