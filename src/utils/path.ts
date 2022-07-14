export const PATH = {
	login: '/login' as const,
	registration: '/registration' as const,
	newPassword: '/new-password' as const,
	passwordRecovery: '/password-recovery' as const,
	passwordRecoveryInfo: '/password-recovery-info' as const,
	profile: '/profile' as const,
	packsList: '/packs-list' as const,
	cardsList: '/cards-list/:packId' as const,
	training: '/training/:packId' as const,
	componentsDemo: '/components-demo' as const,
	about: '/about' as const,
}